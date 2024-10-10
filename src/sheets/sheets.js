import {registerSheet} from 'react-native-actions-sheet';
import {AddExpenseSheet} from './AddExpenseSheet';
import {UploadSheet} from './UploadSheet';
import {FrequencySheet} from './FrequencySheet';

registerSheet('add-expense-sheet', AddExpenseSheet);
registerSheet('upload-sheet', UploadSheet);
registerSheet('frequency-sheet', FrequencySheet);
