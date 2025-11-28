import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LockKeyhole } from "lucide-react";

interface LoginProps {
  onLogin: (phoneNumber: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation: check if it's 11 digits
    const cleanPhone = phone.replace(/-/g, "");
    if (cleanPhone.length !== 11) {
      setError("휴대전화번호 11자리를 정확히 입력해주세요.");
      return;
    }
    onLogin(cleanPhone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 11) {
      setPhone(value);
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-green-800">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="w-6 h-6 text-green-800" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            학부모 인증
          </CardTitle>
          <CardDescription className="text-gray-500 pt-2">
            개인정보 보호를 위해<br />
            등록된 학부모님의 휴대전화번호를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="휴대전화번호 입력 (숫자만)"
                value={phone}
                onChange={handleChange}
                className="text-center text-lg h-12 tracking-wider placeholder:text-gray-300"
                maxLength={11}
              />
              {error && (
                <p className="text-xs text-red-500 text-center font-medium animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-green-700 hover:bg-green-800 transition-colors"
            >
              리포트 조회하기
            </Button>
            <p className="text-[10px] text-center text-gray-400 mt-4">
              * 번호가 변경되었거나 조회가 안 될 경우 담임 선생님께 문의해주세요.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
