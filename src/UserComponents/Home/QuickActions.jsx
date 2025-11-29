import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { Money01Icon } from "@hugeicons/core-free-icons";
import { PaintBoardIcon } from "@hugeicons/core-free-icons";
function QuickActions() {
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold">Quick Actions</h2>
      <div className="flex flex-wrap gap-4 p-6 shadow-lg rounded-xl">
        <button className="bg-[#E6F2FA] text-gray-700 text-2xl p-5 flex flex-row gap-4 rounded-xl">
          <HugeiconsIcon icon={UserAdd01Icon} />
          Add Client
        </button>
        <button className="bg-[#FFF7ED] text-gray-700 text-2xl p-5 flex flex-row gap-4 rounded-xl">
          <HugeiconsIcon icon={Money01Icon} />
          Add Estimate
        </button>
        <button className="bg-[#FAF5FF] text-gray-700 text-2xl p-5 flex flex-row gap-4 rounded-xl">
          <HugeiconsIcon icon={PaintBoardIcon} /> Design Consultation
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
