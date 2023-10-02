const FileInfo = () => {
  return (
    <div className="flex w-[155px] rounded-lg p-2">
      <div className="bg-red-600 w-1/3 rounded-s-lg "></div>
      <div className="border border-neutral-50 p-2 rounded-e-lg w-2/3">
        <p className="font-normal text-xs text-[#616363]">FileName.Pdf</p>
        <p className="font-normal text-xs text-[#B9BCBC]">23.09 MB</p>
      </div>
    </div>
  );
};

export default FileInfo;
