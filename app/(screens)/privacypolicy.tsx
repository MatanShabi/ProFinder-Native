import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Title style={styles.sectionTitle}>Introduction</Title>
        <Paragraph style={styles.paragraph}>
          Our app respects your privacy and is committed to protecting your
          personal data. This privacy policy will inform you as to how we look
          after your personal data when you visit our app (regardless of where
          you visit it from) and tell you about your privacy rights and how the
          law protects you.
        </Paragraph>

        <Title style={styles.sectionTitle}>The data we collect about you</Title>
        <Paragraph style={styles.paragraph}>
          Personal data, or personal information, means any information about an
          individual from which that person can be identified. It does not
          include data where the identity has been removed (anonymous data).
        </Paragraph>

        <View style={styles.listContainer}>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Identity Data includes
            [first name, last name or similar identifier].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Contact Data includes
            [email address].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Financial Data includes
            [prices of your purchased items].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Transaction Data
            includes [details about payments to and from you and other details
            of products and services you have purchased from us].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Technical Data includes
            [internet protocol (IP) address, your login data, browser type and
            version, time zone setting and location, browser plug-in types and
            versions, operating system and platform, and other technology on the
            devices you use to access this app].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Profile Data includes
            [your username and password, purchases or orders made by you, your
            interests, preferences, feedback and survey responses].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Usage Data includes
            [information about how you use our app, products and services].
          </Paragraph>
          <Paragraph style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text> Marketing and
            Communications Data includes [your preferences in receiving
            marketing from us and our third parties and your communication
            preferences].
          </Paragraph>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  card: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 20,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  listContainer: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  listItemBullet: {
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default PrivacyPolicyScreen;
