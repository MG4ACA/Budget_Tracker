import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'


interface RouterProps {
    navigation: NavigationProp<any, any>
}
const List = ({navigation}: RouterProps) => {

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title='LogOut' onPress={()=> FIREBASE_AUTH.signOut()} />
    </View>
  )
}

export default List