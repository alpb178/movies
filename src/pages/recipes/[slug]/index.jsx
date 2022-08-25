/* eslint-disable react/react-in-jsx-scope */
import RecipeForm from '@/containers/recipe/RecipeDetails';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RecipeFormPage = () => {
  const router = useRouter();
  const recipeId = router.query.slug;

  return (
    <div className="bg-white">
      <RecipeForm recipeId={recipeId} />
    </div>
  );
};

RecipeFormPage.layout = Admin;
RecipeFormPage.roles = [ROLE_ADMIN];

export default RecipeFormPage;
