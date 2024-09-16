import { Typography, Button } from '@mui/material';
import { set, useFieldArray, useForm } from 'react-hook-form';
import styles from './search-bar.module.css';
import { useEffect, useState } from 'react';
import { SearchDto } from '@sep-frontend/models';
import { GetPageOfContractsResponse, SearchContracts } from '@sep-frontend/features/search/contracts-view/data-access';
import { SearchLaws } from '@sep-frontend/features/search/laws-view/data-access';

/* eslint-disable-next-line */
export interface SearchBarProps { 
  page: number;
  size: number;
  sendDataToParent: any;
  resetDataOnParent: any;
  availableFields: string[];
  availableFieldsNames: string[];
  documentType: string;
}

export function SearchBar(props:SearchBarProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'searchRows'
  });

  const onSubmit = async (data: any) => {
    let searchDto: SearchDto = {
      searchParams: [],
      radius: 0,
    }

    data?.searchRows?.forEach((row: any) => {
      let searchOperation: string = row.isPhrase ? row.operation + ':PHRASE' : row.operation;
      let searchParam: string = row.field + ':' + row.value;

      searchDto.searchParams.push(searchOperation);
      searchDto.searchParams.push(searchParam);
      searchDto.radius = row.radius ? row.radius : 0;
    });

    if (props.documentType === 'Contract') {
      let contracts = SearchContracts(searchDto, props.page , props.size);
      props.sendDataToParent((await contracts));
    }
    if (props.documentType === 'Law') {
      let laws = SearchLaws(searchDto, props.page , props.size);
      props.sendDataToParent((await laws));
    }
  };

  const addSearchRow = () => {
    append({ operation: 'AND', field: '', value: '', radius: '', isPhrase: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      {fields.map((item, index) => (
        <div key={item.id} className={styles.lineContainer}>
          <div className={styles.groupContainer}>
            <div className={styles.selectContainer}>
              <select id={`operation-${index}`} {...register(`searchRows.${index}.operation`)}>
                <option value="">Select Operation</option>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
              </select>
              <label className={styles.label} htmlFor={`operation-${index}`} id={`label-operation-${index}`}>
                <div className={styles.text}>Operation</div>
              </label>
            </div>

            <div className={styles.selectContainer}>
              <select id={`field-${index}`} {...register(`searchRows.${index}.field`)}>
                <option value="">Select Field</option>
                {props.availableFields.map((field, index) => (
                  <option key={index} value={field}>{props.availableFieldsNames[index]}</option>
                ))}
              </select>
              <label className={styles.label} htmlFor={`field-${index}`} id={`label-field-${index}`}>
                <div className={styles.text}>Field</div>
              </label>
            </div>

            <div className={styles.inputContainer}>
              <input type="text" id={`value-${index}`} {...register(`searchRows.${index}.value`)} />
              <label className={styles.label} htmlFor={`value-${index}`} id={`label-value-${index}`}>
                <div className={styles.text}>Value</div>
              </label>
              <label className={styles.errorLabel}>{(errors.searchRows as any)?.[index]?.value?.message}</label>
            </div>

            {watch(`searchRows.${index}.field`) === 'address' && (
              <div className={styles.selectContainer}>
                <input type="number" id={`radius-${index}`} {...register(`searchRows.${index}.radius`)} />
                <label className={styles.label} htmlFor={`radius-${index}`} id={`label-radius-${index}`}>
                  <div className={styles.text}>Radius</div>
                </label>
                <label className={styles.errorLabel}>{(errors.searchRows as any)?.[index]?.radius?.message}</label>
              </div>
            )}
            {watch(`searchRows.${index}.field`) !== 'address' && (
              <div className={styles.phraseContainer}>
                <label className={styles.label} htmlFor={`isPhrase-${index}`} id={`label-isPhrase-${index}`}>
                  Is Phrase
                </label>
                <input type="checkbox" id={`isPhrase-${index}`} {...register(`searchRows.${index}.isPhrase`)} />
              </div>
            )}
          </div>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              remove(index);
            }}
            sx={{ color: 'white', background: '#212121', height: '48px', ':hover': { background: 'white', color: '#212121' } }}
          >
            Remove
          </Button>
        </div>
      ))}
      <div className={styles.lineContainer}>
        <Button
          variant="contained"
          size="large"
          onClick={addSearchRow}
          sx={{ color: 'white', background: '#212121', height: '48px', minWidth: '200px', ':hover': { background: 'white', color: '#212121' } }}
        >
          Add Row
        </Button>

        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ color: 'white', background: '#212121', height: '48px', minWidth: '200px', ':hover': { background: 'white', color: '#212121' } }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          size="large"
          type="reset"
          onClick={() =>  { reset({ searchRows: [] }); props.resetDataOnParent()}}
          sx={{ color: 'white', background: '#212121', height: '48px', minWidth: '200px', ':hover': { background: 'white', color: '#212121' } }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
