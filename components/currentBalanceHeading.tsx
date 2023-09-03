interface props {
  currentBalance: number;
}

const CurrentBalanceHeading: React.FC<props> = ({ currentBalance }) => {
  return (
    <div className="flex items-start px-16 py-14 bg-slate-200">
      <div className="flex flex-col gap-2">
        <div className=" text-3xl font-semibold">
          {" "}
          <span>&#36;</span> {currentBalance}
        </div>
        <div className="uppercase font-thin">balance</div>
      </div>
    </div>
  );
};

export default CurrentBalanceHeading;
