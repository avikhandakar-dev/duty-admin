const FaceWithSmile = ({ image }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-info rounded">
      <div className="px-4 py-3 bg-info text-info-content card-title">
        Face With Smile
      </div>
      <div className="card-body">
        <img src={image} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FaceWithSmile;
