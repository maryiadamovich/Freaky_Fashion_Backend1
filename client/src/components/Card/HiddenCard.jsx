export default function HiddenCard() {

    const photo = "https://placehold.co/400x300/?text=Lorem ipsum dolor.png";

    return (
        <article>
            <div className="border">
                <img src={photo} alt="En interaktiv bild" className="w-full" />
            </div>
        </article>
    );
}