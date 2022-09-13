import CreateAccountForm from '@/containers/account/form';
import Auth from 'layouts/Auth.js';

const CreateAccount = () => <CreateAccountForm />;

CreateAccount.layout = Auth;

export default CreateAccount;
