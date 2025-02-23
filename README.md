BackgroundBlur helps protect sensitive app screens by displaying a blurred image when your app becomes inactive. It ensures that confidential information remains hidden when switching between apps.

## Features

- **Automatic Blur Protection:** Overlays a blur image automatically when your app becomes inactive.
- **Custom Blur Image:** Use any image as the blur overlay.
- **Supports All File Formats:** Use any file format for the image.
- **Supports URIs to Image Files:** Use URIs to any image online.
- **Adjustable Blur Intensity:** Customize the blur effect for better privacy.
- **Smooth Transitions:** Optional animated transitions when showing or hiding the blur overlay.
- **Customizable Styling:** Modify the blur image style to match your app's design.

## Installation

No linking required.
Supports all React Native versions after 0.70.0.

```
npm install secure-screen
```
or
```
yarn add secure-screen
```

## Overview
<img src="https://drive.google.com/file/d/1zlke_CsKCgNKzcHnQnbYDPbmIuFNZx7p/view" width="100%">
<img src="https://drive.google.com/file/d/1OoGQ8LSxLd-IhPGrAZS8Pje9rpWs2aLH/view" width="100%">

## Usage
Can be used directly in the root file to provide a consistent screen style across your app.
Can also be used in a specific screen to provide blur functionality only for that screen.

```
import BackgroundBlur from "react-native-background-blur";

const App = () => {
  return (
    <React.Fragment>
      <BackgroundBlur
        <!-- onBlurImage={{ uri: welcome }} -->
        onBlurImage={require("./assets/welcome.png")}
        blurIntensity={100}
        onBlur={() => console.log('blur screen is active!')}
        onFocus={() => console.log('focus screen is active!')}
        transitionWithAnimation={true}
        animDuration={500}
      />
      <View style={{ flex: 1, alignContent: 'center' }}>
        <TextInput textAlign='center' value='SECURE THIS INPUT WHEN APP BECOMES INACTIVE' style={{ borderWidth: 1, borderRadius: 10, margin: 10 }} />
      </View>
    </React.Fragment>
  );
};

export default App;
```

## Props

| Prop                      | Type                    | Default       | Description 
|---------------------------|-------------------------|---------------|-------------
| `onBlurImage`             | `ImageSourcePropType`   | **Required**  | Image displayed when the app is in the background.
| `blurImageStyle`          | `StyleProp<ImageStyle>` | `undefined`   | Style for the blur image.
| `blurIntensity`           | `number`                | `3`           | Blur radius intensity.
| `resizeMode`              | `ImageResizeMode`       | `"cover"`     | Resize mode of the blur image.
| `onBlur`                  | `() => any`             | `undefined`   | Callback when the blur effect is applied.
| `onFocus`                 | `() => any`             | `undefined`   | Callback when the blur effect is removed.
| `transitionWithAnimation` | `boolean`               | `true`        | Enables or disables fade animation.
| `animDuration`            | `number`                | `500`         | Duration of the fade animation in milliseconds.

## License
MIT