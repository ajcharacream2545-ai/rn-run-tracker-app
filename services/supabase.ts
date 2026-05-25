// ลบการสร้าง Client ของจริงออก แล้วสร้างตัวจำลองขึ้นมาครอบเพื่อตัดการเชื่อมต่อออนไลน์
export const supabase = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      match: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
};
