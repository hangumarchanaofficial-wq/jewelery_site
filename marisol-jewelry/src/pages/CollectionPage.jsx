import CollectionHero from "../components/collection/CollectionHero";
import CollectionStory from "../components/collection/CollectionStory";
import CinematicVisual from "../components/collection/CinematicVisual";
import CollectionPieces from "../components/collection/CollectionPieces";

export default function CollectionPage() {
    return (
        <>
            <CollectionHero />
            <CollectionStory />
            <CinematicVisual />
            <CollectionPieces />
        </>
    );
}
