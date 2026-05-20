import PageContainer from "../../components/layouts/PageContainer"

export default function HomePage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6 text-text">
        Hệ thói quen hàng ngày
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample Card 1 */}
        <div className="bg-cardBg border border-darkBorder rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="text-4xl">💧</div>
            <div className="text-right">
              <h3 className="font-semibold text-lg text-text">Uống nước</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white border border-darkBorder px-3 py-1 rounded-lg font-medium">
                  8
                </span>
                <span className="text-sm">Cốc</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-primaryRed font-medium">
            🔥 Giảm calo dự tính: 150 calo
          </div>
        </div>

        {/* Sample Card 2 */}
        <div className="bg-cardBg border border-darkBorder rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="text-4xl">🚶‍♀️</div>
            <div className="text-right">
              <h3 className="font-semibold text-lg text-text">Đi bộ</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white border border-darkBorder px-3 py-1 rounded-lg font-medium">
                  7
                </span>
                <span className="text-sm">Cốc</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-primaryRed font-medium">
            🔥 Giảm calo dự tính: 76 calo
          </div>
        </div>

        {/* Sample Card 3 */}
        <div className="bg-cardBg border border-darkBorder rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="text-4xl">🏋️‍♂️</div>
            <div className="text-right">
              <h3 className="font-semibold text-lg text-text">Tập luyện</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white border border-darkBorder px-3 py-1 rounded-lg font-medium">
                  0
                </span>
                <span className="text-sm">calo</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-primaryRed font-medium">
            🔥 Giảm calo dự tính: 4 calo
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
