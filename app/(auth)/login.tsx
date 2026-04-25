import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Matchan</Text>
        <Text style={styles.subtitle}>
          おかえりなさい！{"\n"}メールアドレスだけで、すぐにつながれます。
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>メールアドレス</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="example@mail.com"
          placeholderTextColor="#aaa"
          onChangeText={(email) => setEmailAddress(email)}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>ログイン用メールを送る</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            /* Googleログインを後で入れる */
          }}
        >
          <Text style={styles.footerText}>Googleで続ける</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// 画面を綺麗に整えるスタイルの設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7", // 暖かい背景色 (warm-50相当)
    justifyContent: "center", // 縦方向の真ん中に配置
    paddingHorizontal: 32, // 左右の余白
  },
  header: {
    alignItems: "center", // 横方向の真ん中に配置
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#D97757", // メインカラー (warm-500相当)
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F5EFE6",
    // 影をつける設定
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2, // Android用の影
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#D97757",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    color: "#D97757",
    fontWeight: "600",
    fontSize: 16,
  },
});
