const FaceWithoutSmile = ({ image }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-warning rounded">
      <div className="px-4 py-3 bg-warning text-warning-content card-title">
        Face Without Smile
      </div>
      <div className="card-body">
        <img src={image} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FaceWithoutSmile;
