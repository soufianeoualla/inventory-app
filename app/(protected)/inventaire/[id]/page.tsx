import { InventoryWrapper } from "@/components/inventory/InventoryWrapper";

const InventoryPage = () => {
  return (
    <div className="h-[calc(100vh-80px)] p-6 w-[calc(100vw-250px)]  bg-Charcoal overflow-y-scroll">
      <InventoryWrapper />
    </div>
  );
};

export default InventoryPage;
