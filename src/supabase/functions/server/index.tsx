import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-41d28b0a/health", (c) => {
  return c.json({ status: "ok" });
});

// Report Data Endpoint
app.get("/make-server-41d28b0a/report", async (c) => {
  try {
    const id = c.req.query("id") || "default";
    const key = `report_student_${id}`;
    let data = await kv.get(key);

    if (!data) {
      // Initial Seed Data based on user's requested schema
      data = {
        // Basic Info
        student_name: "최서현",
        school: "서울초등학교",
        grade: "4학년",
        class_name: "FLY반",
        test_round: "2025년 11월 5회차",
        
        // Grade Core Goal
        grade_badge: "4학년",
        core_goal: "기초 문장 구조에 익숙해지고, 초등 필수 단어/단문 이해력 안정시키기",
        
        // Vocab Section
        vocab_score: 72,
        vocab_total: 600,
        vocab_percent: 12,
        vocab_comment: "주제별로 초등 필수 어휘를 체계적으로 학습하며 어휘력의 기초를 다집니다",
        vocab_book: "Word Master 초등 Complete",
        
        // Reading Section
        reading_comment: "한 문장을 \"끊어 읽기\" 할 수 있는 수준 확보 및 긴 문장에서 주어, 동사 찾는 습관을 형성합니다. 초등 교과서 수준의 짧은 정보 글을 읽고 내용을 파악합니다.",
        reading_book: "Subject Link Starter 1 ~ 3",
        reading_task: "직독직해 & 구문 분석 → 주어·동사 구분 완성",
        
        // Grammar Section
        grammar_comment: "문장의 기본 구조를 익히고 명사와 관사의 이해 및 활용 능력을 기릅니다.",
        grammar_book: "Grammar Mento Joy 시리즈",
        grammar_scope: "명사, 대명사, 관사",
        
        // Chart Data
        reading_student: 90,
        reading_average: 78,
        reading_top30: 94,
        grammar_student: 85,
        grammar_average: 75,
        grammar_top30: 90,
        total_student: 175,
        total_average: 153,
        total_top30: 184,
        
        // Teacher's Message
        strength: "수업 태도가 매우 성실하며, 새로운 어휘를 습득하려는 열의가 돋보이는 학생입니다. 특히 독해 지문을 읽을 때 문맥을 파악하는 직관력이 뛰어나고, 과제를 꼼꼼하게 수행하는 습관이 잡혀 있어 꾸준한 성장이 기대됩니다.",
        growth_point: "문법 규칙을 실제 문제 풀이에 적용하는 과정에서 다소 어려움을 겪고 있습니다. 복잡한 문장 구조를 분석할 때 실수가 잦은 편이므로, 개념을 확실히 정리하고 다양한 유형의 문제를 통해 응용력을 기르는 것이 필요합니다.",
        teaching_plan: "취약한 문법 영역을 보완하기 위해 매주 핵심 개념 정리와 맞춤형 클리닉을 진행하겠습니다. 또한 서술형 평가에 대비하여 문장 구조 분석 훈련을 강화하고, 자주 틀리는 유형을 오답 노트로 정리하여 실수를 줄여나가도록 지도할 계획입니다."
      };
      
      // Only save if it's the default ID, or we can save all to seed them.
      // Let's save it so the user can edit it later if we add an edit feature.
      await kv.set(key, data);
    }

    return c.json(data);
  } catch (error) {
    console.error("Error fetching report data:", error);
    return c.json({ error: "Failed to fetch report data" }, 500);
  }
});


Deno.serve(app.fetch);