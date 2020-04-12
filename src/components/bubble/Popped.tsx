import React, {useState} from 'react';
import {Body, Card, CardItem, Icon, Text, View} from 'native-base';
import {SubmitButton} from '../common/SubmitButton';
import {useAPI} from '../../api/useAPI';
import {useAuth} from '../../auth/Auth';
import Toast from '../common/Toast';
import {Linking} from 'react-native';

export const Popped: React.FC = () => {
  const [isResettingBubble, setIsResettingBubble] = useState<boolean>(false);
  const auth = useAuth();
  const api = useAPI();
  const reset = async () => {
    setIsResettingBubble(true);
    try {
      if (auth?.state.uid) {
        await api.resetBubble(auth?.state.uid);
      }
    } catch (err) {
      Toast.danger(err.message);
    } finally {
      setIsResettingBubble(false);
    }
  };

  const openLink = () => {
    const url =
      'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Toast.danger('Failed to open browser');
      }
    });
  };
  return (
    <>
      <Card>
        <CardItem>
          <Body style={{flex: 1, alignItems: 'center'}}>
            <Icon
              name={'user-shield'}
              type={'FontAwesome5'}
              style={{fontSize: 64, color: '#d9534f'}}
            />
            <Text style={{marginVertical: 32, fontWeight: 'bold'}}>Your bubble has popped!</Text>
            <Text style={{textAlign: 'justify', marginBottom: 16}}>
              If you're not the one who popped it, it means that someone along
              the chain of people you've met recently, or whom they have met
              recently, etc, has popped their bubble.
            </Text>
            <Text style={{textAlign: 'justify', marginBottom: 16}}>
              This means you could potentially have been infected, and could
              transmit the virus as well. Therefore we recommend that you take
              extra care when meeting people, and stay aware of potential
              symptoms if they appear. Take a test if they are available, or
              start a precautionary period of social distancing. If symptoms
              appear, seek medical assistance.
            </Text>
            <Text>More information can be found here:</Text>
            <SubmitButton
              label={'World Health organization'}
              onPress={() => openLink()}
            />
            <Text style={{textAlign: 'justify', marginTop: 16}}>
              When you are reasonably sure it is safe for you and people around
              you to resume normal interactions, reset you bubble.
            </Text>
            <SubmitButton
              testID={'resetBubble'}
              accessibilityLabel={'Reset Bubble'}
              label={'Reset Bubble'}
              isSubmitting={isResettingBubble}
              onPress={() => reset()}
            />
          </Body>
        </CardItem>
      </Card>
    </>
  );
};
