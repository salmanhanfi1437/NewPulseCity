import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {

    Splash : undefined;
    Login : undefined;
    signup : undefined;

}

export type SplashProps = StackScreenProps<RootStackParamList,'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList,'Login'>;
export type SignupProps = StackScreenProps<RootStackParamList,'signup'>;