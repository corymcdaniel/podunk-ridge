const SCENES = ["sunset", "fire", "storm", "harvest"];

export function SceneArt({ scene }) {
  const key = SCENES.includes(scene) ? scene : "sunset";

  if (key === "sunset") {
    return (
      <div className="pr-scene pr-scene-sunset">
        <div className="pr-ground" />
        <div className="pr-sun" />
      </div>
    );
  }
  if (key === "fire") {
    return (
      <div className="pr-scene pr-scene-fire">
        <div className="pr-glow" />
        <div className="pr-silhouette" />
      </div>
    );
  }
  if (key === "storm") {
    return (
      <div className="pr-scene pr-scene-storm">
        <div className="pr-dust" />
        <div className="pr-ground" />
      </div>
    );
  }
  return (
    <div className="pr-scene pr-scene-harvest">
      <div className="pr-field" />
      <div className="pr-sun2" />
    </div>
  );
}

export const SCENE_OPTIONS = SCENES;
