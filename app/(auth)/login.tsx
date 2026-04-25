import { useSignIn, useSignUp } from "@clerk/clerk-expo"; // ← useSignUpを追加
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
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp(); // ← サインアップ用の機能を準備
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");

  // メール送信処理（ログイン・新規登録の自動判定）
  const onSignInPress = async () => {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    try {
      // 【1】まずは既存アカウントとしてのログインを試みる
      await signIn.create({
        identifier: emailAddress,
      });

      // 成功した場合（＝すでに登録済み）
      alert("おかえりなさい！\nログイン用のメールを送信しました。");
    } catch (err: any) {
      // エラーメッセージとエラーコードを取得
      const errorMsg = err.errors[0]?.message || "";
      const errorCode = err.errors[0]?.code || "";

      // 【2】エラー内容が「アカウントが見つからない」だった場合、自動で新規登録へ！
      if (
        errorCode === "form_identifier_not_found" ||
        errorMsg.includes("Couldn't find your account")
      ) {
        try {
          // 新規アカウントの作成を開始
          await signUp.create({
            emailAddress: emailAddress,
          });

          // 作成に成功した場合（＝はじめてのユーザー）
          alert("はじめまして！\n新規登録用のメールを送信しました。");
        } catch (signUpErr: any) {
          console.error(JSON.stringify(signUpErr, null, 2));
          alert("新規登録エラー: " + signUpErr.errors[0]?.message);
        }
      } else {
        // アカウントが見つからない「以外」の予期せぬエラー
        console.error(JSON.stringify(err, null, 2));
        alert("エラーが発生しました: " + errorMsg);
      }
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
    backgroundColor: "#FDFBF7",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#D97757",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
