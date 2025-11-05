import { MainLayout } from './layouts';
import { RoutesManager } from './routes/routes';


export const App = () => {

  return (
    <MainLayout
      content={<RoutesManager />}
    />
  );
};
