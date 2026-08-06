import PageContainer from "../../components/layouts/PageContainer";
import { Droplet, Footprints, Dumbbell, LayoutGrid } from "lucide-react";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="text-3xl font-black mb-8 text-textPrimary uppercase tracking-tight flex items-center gap-3 pb-4 border-b-2 border-dashed border-darkBorder/20">
        <div className="bg-primaryRed text-white p-2 rounded-xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center">
          <LayoutGrid className="w-6 h-6" />
        </div>
        <h1>Daily Habits Tracker</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Habit Card 1 */}
        <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] flex flex-col justify-between min-h-[180px] group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-100 p-3 rounded-2xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center text-3xl text-blue-600 group-hover:scale-105 transition-transform duration-200">
              <Droplet className="w-8 h-8 fill-blue-600/20" />
            </div>
            <div className="text-right">
              <h3 className="font-black text-xl text-textPrimary">Water Intake</h3>
              <div className="flex items-center gap-2 mt-2 justify-end">
                <span className="bg-white border-2 border-darkBorder px-3.5 py-1 rounded-xl font-black text-textPrimary shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] text-sm">
                  8
                </span>
                <span className="text-xs font-black text-textSoft uppercase tracking-wider">Glasses</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-primaryRed font-black uppercase tracking-wider border-t border-darkBorder/10 pt-3">
            🔥 Calorie goal: 150 kcal
          </div>
        </div>

        {/* Habit Card 2 */}
        <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] flex flex-col justify-between min-h-[180px] group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-100 p-3 rounded-2xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center text-3xl text-green-700 group-hover:scale-105 transition-transform duration-200">
              <Footprints className="w-8 h-8" />
            </div>
            <div className="text-right">
              <h3 className="font-black text-xl text-textPrimary">Daily Steps</h3>
              <div className="flex items-center gap-2 mt-2 justify-end">
                <span className="bg-white border-2 border-darkBorder px-3.5 py-1 rounded-xl font-black text-textPrimary shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] text-sm">
                  7,500
                </span>
                <span className="text-xs font-black text-textSoft uppercase tracking-wider">Steps</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-primaryRed font-black uppercase tracking-wider border-t border-darkBorder/10 pt-3">
            🔥 Estimated burn: 300 kcal
          </div>
        </div>

        {/* Habit Card 3 */}
        <div className="bg-cardBg border-4 border-darkBorder rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] flex flex-col justify-between min-h-[180px] group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-red-100 p-3 rounded-2xl border-2 border-darkBorder shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] flex items-center justify-center text-3xl text-red-600 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-8 h-8" />
            </div>
            <div className="text-right">
              <h3 className="font-black text-xl text-textPrimary">Workout Gym</h3>
              <div className="flex items-center gap-2 mt-2 justify-end">
                <span className="bg-white border-2 border-darkBorder px-3.5 py-1 rounded-xl font-black text-textPrimary shadow-[2px_2px_0px_0px_rgba(43,43,43,1)] text-sm">
                  45
                </span>
                <span className="text-xs font-black text-textSoft uppercase tracking-wider">Mins</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-primaryRed font-black uppercase tracking-wider border-t border-darkBorder/10 pt-3">
            🔥 Estimated burn: 250 kcal
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
