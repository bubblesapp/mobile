import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/NavProvider';
import {useAPI} from '../../api/useAPI';
import {Bubble as BubbleModel} from '../../models/Bubble';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Badge, Button, Icon, withBadge} from 'react-native-elements';

export const InviteButton: React.FC = () => {
  const nav = useNavigation();
  const api = useAPI();
  const [incomingInvitesCount, setIncomingInvitesCount] = useState<number>(0);
  const [bubble, setBubble] = useState<BubbleModel | undefined>();

  useEffect(() => {
    const invitesSubscription = api.invites.incoming.observeAll().subscribe({
      next: (value) => setIncomingInvitesCount(value.length),
    });
    return () => invitesSubscription.unsubscribe();
  }, [api]);

  useEffect(() => {
    const bubbleSubscription = api.bubble.observe().subscribe((bu) => {
      setBubble(bu);
    });
    return () => bubbleSubscription.unsubscribe();
  }, [api]);

  return bubble?.isPopped ? null : (
    <View>
      <Button
        testID={'newInviteButton'}
        accessibilityLabel={'New Invite'}
        style={{paddingRight: 0}}
        type={'clear'}
        onPress={() => {
          nav.navigate(Routes.Invites);
        }}
        icon={<FontAwesome5 name={'user-plus'} size={24} />}
      />
      {incomingInvitesCount > 0 ? (
        <Badge
          status={'error'}
          value={incomingInvitesCount}
          containerStyle={{
            position: 'absolute',
            top: 4,
            right: 4,
          }}
          textStyle={{fontWeight: 'bold', lineHeight: 18}}
          badgeStyle={{borderColor: 'red'}}
        />
      ) : null}
    </View>
  );
  /*incomingInvitesCount > 0 ? (
      <Badge
        style={{
          position: 'absolute',
          top: 4,
          right: 8,
          transform: [{scaleX: 0.8}, {scaleY: 0.8}],
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {incomingInvitesCount}
        </Text>
      </Badge>
    ) : null*/
};
