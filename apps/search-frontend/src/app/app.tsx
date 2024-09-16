// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@sep-frontend/features/shared/login/container';
import { RegisterPage } from '@sep-frontend/features/shared/register/container';
import { SearchRoutes } from '@sep-frontend/models';
import { NavigationBar } from '@sep-frontend/features/search/navigation-bar/container';
import { ContractsPage } from '@sep-frontend/features/search/contracts-view/container';
import { UploadFile } from '@sep-frontend/features/search/upload-file/container';
import { LawsPage } from '@sep-frontend/features/search/laws-view/container';

export function App() {
  return (
    <>
    <NavigationBar />
    <Routes>
        {/*Unprotected Routes*/}
        <Route path={SearchRoutes.Login} element={<LoginPage />} />
        <Route path={SearchRoutes.Register} element={<RegisterPage />} />

        {/*Protected Routes*/}
        <Route path={SearchRoutes.Contracts} element={<ContractsPage />} />
         <Route path={SearchRoutes.Laws} element={<LawsPage />} />
        <Route path={SearchRoutes.UploadContract} element={<UploadFile fileType="Contract" />} />
        <Route path={SearchRoutes.UploadLaw} element={<UploadFile fileType="Law" />} />
    </Routes>
    </>
  );
}

export default App;
