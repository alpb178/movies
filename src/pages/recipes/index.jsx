import RecipesList from '@/containers/recipe/RecipesList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RecipesPage = () => {
  return <RecipesList />;
};

RecipesPage.layout = Admin;
RecipesPage.roles = [ROLE_ADMIN];

export default RecipesPage;
