import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export const RHFUploadFile = () => {
  return (
    <Button style={styles.button} onPress={() => openChoiceSheet}>
      <Text>Add Attachment</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 25,
  },
});
