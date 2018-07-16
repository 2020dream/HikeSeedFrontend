import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subcontainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10,
  },
  header: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
          paddingTop: '15%',
        },
        android: {
          fontFamily: 'sans-serif-medium',
          paddingTop: '10%',
        }
    }),
    fontSize: 30,
    color: 'orange',
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#f0f2ef',
    width: '100%',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
        },
        android: {
          fontFamily: 'sans-serif-medium',
        }
    }),
    fontSize: 25,
    color: '#468728',
    padding: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...Platform.select({
         ios: { fontFamily: 'Optima-Bold', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10,
  },
  button: {
    width: 130,
    marginTop: 10,
  },
  text: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  midtext: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  smalltext: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
  },
  nicknames: {
    alignItems: 'flex-start',
  },
  input: {
    borderColor: '#468728',
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    marginBottom: 10,
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
    padding: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 130,
    height: 130,
    margin: 10,
  },
  smallImage: {
    width: 70,
    height: 70,
    margin: 10,
  },
});
