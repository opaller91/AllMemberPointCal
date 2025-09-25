import React, { useMemo, useState } from "react";

// 100 คะแนน = 1 บาท
const RATE_POINTS_PER_BAHT = 100;

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("th-TH", { maximumFractionDigits: 2 });
}

function parseNumber(input: string) {
  const cleaned = input.replace(/[^0-9.-]/g, "");
  const val = Number(cleaned);
  return Number.isFinite(val) ? val : 0;
}

export default function SimpleAllMemberCalculator() {
  const [points, setPoints] = useState<number>(0);

  const discountBaht = useMemo(() => points / RATE_POINTS_PER_BAHT, [points]);
  const notMultipleOf100 = useMemo(() => points % 100 !== 0, [points]);

  const quickSet = (v: number) => setPoints(v);
  const quickAdd = (v: number) => setPoints((p) => Math.max(p + v, 0));
  const roundToHundreds = () => setPoints(Math.round(points / 100) * 100);

  const copyDiscount = async () => {
    try {
      await navigator.clipboard.writeText(String(discountBaht.toFixed(2)));
      alert("คัดลอกจำนวนส่วนลดแล้ว");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-4 sm:p-6">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
         <div className="mb-6 sm:mb-8">

         </div>
          <div className="text-3xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            คำนวณส่วนลดจากคะแนน
            <span className="block bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">All Member</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600">อัตราแลก: <span className="font-semibold">100 คะแนน = 1 บาท</span></p>
        </header>

        {/* Card */}
        <section className="rounded-3xl border border-white/60 bg-white/80 p-4 sm:p-6 shadow-xl backdrop-blur-lg ring-1 ring-black/5">
          <label className="mb-2 block text-xs sm:text-sm font-medium text-neutral-700">คะแนนที่ต้องการใช้</label>

          {/* Modern input with unit */}
          <div className="mb-3 flex flex-col sm:flex-row sm:items-stretch gap-2">
            <div className="flex w-full items-center rounded-2xl border border-neutral-200 bg-white px-3 sm:px-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
              <input
                inputMode="numeric"
                className="peer w-full bg-transparent py-2.5 sm:py-3 text-base sm:text-lg outline-none placeholder:text-neutral-300"
                placeholder="เช่น 12,000"
                value={points ? points.toLocaleString("th-TH") : ""}
                onChange={(e) => setPoints(parseNumber(e.target.value))}
              />
              <span className="ml-2 select-none rounded-xl bg-neutral-100 px-2 py-1 text-[10px] sm:text-xs font-medium text-neutral-600">คะแนน</span>
            </div>
          </div>

          {/* Quick chips (responsive wrap) */}
          {/* สามารถเปิดใช้ได้ ถ้าต้องการปุ่มลัด
          <div className="mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
            {[100, 500, 1000, 5000, 10000, 20000].map((v) => (
              <button
                key={v}
                onClick={() => quickSet(v)}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 shadow-sm transition hover:bg-neutral-50"
              >
                {v.toLocaleString("th-TH")} คะแนน
              </button>
            ))}
            <button onClick={() => quickAdd(100)} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 shadow-sm transition hover:bg-neutral-50">+100</button>
            <button onClick={() => quickAdd(500)} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 shadow-sm transition hover:bg-neutral-50">+500</button>
            <button onClick={() => setPoints(0)} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 shadow-sm transition hover:bg-neutral-50">เคลียร์</button>
          </div>
          */}

          {/* Hint */}
          {/* {notMultipleOf100 && points > 0 && (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs sm:text-sm text-amber-800">
              แนะนำให้ใส่เป็นคูณของ <b>100</b> เพื่อให้แลกได้พอดี (100 คะแนน = 1 บาท)
            </div>
          )} */}

          {/* Result */}
          <div className="rounded-3xl border border-neutral-100 bg-gradient-to-br from-white to-neutral-50 p-4 sm:p-5 shadow-inner">
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">ส่วนลดที่ได้รับ</div>
            <div className="mt-1 flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3">
              <div className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight text-neutral-900">
                {formatNumber(discountBaht)}
              </div>
              <div className="sm:pb-1 text-sm sm:text-base font-medium text-neutral-600">บาท</div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:flex sm:gap-2">
              <button
                onClick={copyDiscount}
                className="mb-2 sm:mb-0 rounded-2xl bg-indigo-600 px-4 py-2 text-sm sm:text-base text-black shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >คัดลอกจำนวนส่วนลด</button>
              <button
                onClick={() => setPoints(0)}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm sm:text-base text-neutral-700 shadow-sm transition hover:bg-neutral-50"
              >รีเซ็ต</button>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-6 text-center text-[10px] sm:text-xs text-neutral-500">© เครื่องมือช่วยคำนวณสำหรับพนักงาน</p>
      </div>
    </div>
  );
}