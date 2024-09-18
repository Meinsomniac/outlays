import {registerSheet} from 'react-native-actions-sheet';
import {AddExpenseSheet} from './AddExpenseSheet';
import {UploadSheet} from './UploadSheet';

registerSheet('add-expense-sheet', AddExpenseSheet);
registerSheet('upload-sheet', UploadSheet);
