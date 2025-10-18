import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {

    Splash : undefined;
    Login : undefined;

}

export type SplashProps = StackScreenProps<RootStackParamList,'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList,'Login'>;