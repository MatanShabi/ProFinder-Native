import React, { FC } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Title, Paragraph } from 'react-native-paper';

const AboutUsScreen : FC = () => {
  const teamMembers = [
    {
      name: "Raz Hagay Gavriel",
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wise-buyer-android-1ab6e.appspot.com/o/teamMembers%2Fraz.jpeg?alt=media&token=c695a6e9-7706-4562-ac44-d8f83cec52e6',
      phoneNumber: "(+972)50-960-5540",
    },
    {
      name: "Matan Shabi",
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wise-buyer-android-1ab6e.appspot.com/o/teamMembers%2Fmatan.jpeg?alt=media&token=47128498-a1fd-4f71-a063-2ad12cc10ac0',
      phoneNumber: "(+972)54-831-5013",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        <Paragraph style={styles.paragraph}>
          This is a social media app that allows users to share and compare the
          products they buy. Users can post about their latest purchases,
          comment on others' posts, and engage in discussions about products.
          {"\n\n"}
          This app was created by a team of developers who wanted to create a
          platform where people can share their shopping experiences and
          discover new products. We hope you enjoy using our app and we are
          always looking for ways to improve it.
        </Paragraph>

        <Title style={styles.title}>Team Members</Title>

        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Avatar.Image
                size={100}
                source={{ uri: member.imageUrl }}
                style={styles.avatar}
              />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberPhoneNumber}>{member.phoneNumber}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  card: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 20,
    width: '90%',
    marginHorizontal: 'auto',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  memberCard: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '45%',
  },
  avatar: {
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  memberPhoneNumber: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutUsScreen;
