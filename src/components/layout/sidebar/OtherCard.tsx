import { Button } from "@/components/ui/button";

function OtherCard() {
  return (
    <div className="p-2 m">
      <h3 className="font-bold text-lg mb-3">Other</h3>
      <ul className="flex flex-col gap-1">
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 px-0.5 py-6 mt-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
          >
            <span>👆</span>
            <span>Privacy Policy</span>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 px-0.5 py-6 mt-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
          >
            <span>👀</span>
            <span>Terms of Use</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default OtherCard;