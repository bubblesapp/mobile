import React from 'react';
import RMCDatePicker from 'rmc-date-picker';
import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import 'rmc-date-picker/assets/index.css';
import './DatePicker.web.css';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  onDatePicked: (date: Date) => void;
  onCancel: () => void;
};

export const DatePicker: React.FC<Props> = ({
  visible,
  onDatePicked,
  onCancel,
}) => {
  return (
    <PopupDatePicker
      onDismiss={() => onCancel()}
      datePicker={<RMCDatePicker
        className={'datePicker'}
      />}
      className={'datePickerModal'}
      mode={'date'}
      date={new Date()}
      maximumDate={new Date()}
      onChange={(date) => onDatePicked(date)}
      visible={visible}
    />
  );
};
