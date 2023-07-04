import { View, Text, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

interface RouterProps {
    navigation: NavigationProp<any, any>
}
const Dashboard = ({navigation}: RouterProps) => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title='LogOut' onPress={()=> FIREBASE_AUTH.signOut()} />
        <Button title='LogOut'  onPress={()=> navigation.navigate('sign_up')}/>
    </View>
  )
}

export default Dashboard
