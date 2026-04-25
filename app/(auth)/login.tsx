import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");

  // マジックリンク送信処理
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      // Clerkでサインイン開始（マジックリンクを飛ばす）
      const { supportedFirstFactors } = await signIn.create({
        identifier: emailAddress,
      });

      // メール認証への案内
      alert(
        "メールを送信しました。届いたリンクをクリックしてログインしてください。",
      );
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      alert("エラーが発生しました: " + err.errors[0].message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-warm-50 justify-center px-8"
    >
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-warm-500 mb-2">Matchan</Text>
        <Text className="text-gray-600 text-center">
          おかえりなさい！{"\n"}メールアドレスだけで、すぐにつながれます。
        </Text>
      </View>

      <View className="bg-white p-6 rounded-3xl shadow-sm border border-warm-100">
        <Text className="text-sm font-semibold text-gray-500 mb-2">
          メールアドレス
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="example@mail.com"
          onChangeText={(email) => setEmailAddress(email)}
          className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100"
        />

        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-warm-500 p-4 rounded-2xl items-center"
        >
          <Text className="text-white font-bold text-lg">
            ログイン用メールを送る
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 items-center">
        <TouchableOpacity
          onPress={() => {
            /* Googleログインを後で入れる */
          }}
        >
          <Text className="text-warm-500 font-medium">Googleで続ける</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
