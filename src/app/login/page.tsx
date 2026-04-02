"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 为了兼容 Supabase Auth 的邮箱格式要求，我们将用户名后缀加上虚拟域名
    const email = `${username}@dish.tracker`;

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      });
      if (error) {
        console.error("Supabase Auth Error:", error);
        if (error.message === "User already registered") {
          setError("该用户名已被注册");
        } else if (error.message.includes("Password")) {
          setError("密码太简单了，请至少输入6位字符");
        } else {
          setError(`注册失败: ${error.message}`);
        }
        setLoading(false);
      } else {
        setError("注册成功！现在请直接登录");
        setIsSignUp(false);
        setLoading(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("登录失败，请检查用户名和密码");
        setLoading(false);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] p-4">
      <div className="card w-full max-w-md shadow-lg border-[var(--border-color)]">
        <div className="text-center mb-8">
          <div className="bg-[var(--text-main)] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] font-serif">
            {isSignUp ? "创建共享账号" : "欢迎回来"}
          </h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">
            {isSignUp ? "设置一个你们共同使用的用户名" : "请输入用户名和密码登录"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider ml-1">用户名</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f5efe0] border-none focus:ring-1 focus:ring-[var(--text-main)] outline-none text-[var(--text-main)] transition-all placeholder:text-[var(--text-muted)]/50"
                placeholder="例如：ourhouse"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider ml-1">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f5efe0] border-none focus:ring-1 focus:ring-[var(--text-main)] outline-none text-[var(--text-main)] transition-all placeholder:text-[var(--text-muted)]/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className={`text-xs font-medium text-center py-2.5 rounded-xl ${
              error.includes("成功") ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
            }`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--text-main)] hover:bg-[#2e251a] text-[#fdfcf8] font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? "立即注册" : "立即登录")}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[var(--border-color)] pt-6">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-[var(--text-muted)] text-sm font-medium hover:text-[var(--text-main)] transition-colors"
          >
            {isSignUp ? "已有账号？去登录" : "还没有账号？去注册"}
          </button>
        </div>
      </div>
    </div>
  );
}
