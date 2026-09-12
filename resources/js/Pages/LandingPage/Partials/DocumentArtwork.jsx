import Icon from "@/Components/Icon";

const DocumentArtwork = () => {
    return (
        <div
            className="document-art"
            role="img"
            aria-label="Illustration of a document with a QR label. Register, generate, and access."
        >
            <div className="art-orbit" />
            <span className="art-sticker sticker-top">
                LESS PAPER CHASING. <span>MORE DOING.</span>
            </span>
            <div className="art-folder">
                <span>THE GOOD STUFF ↗</span>
            </div>
            <div className="art-document">
                <div className="document-top">
                    <span>SDO / DOCUMENTS</span>
                    <Icon name="file" />
                </div>
                <span className="document-caption">
                    EVERY DOCUMENT HAS A STORY.
                </span>
                <strong>
                    LET’S GET
                    <br />
                    YOURS MOVING.
                </strong>
                <div className="document-lines">
                    <i />
                    <i />
                    <i />
                </div>
                <div className="document-bottom">
                    <div className="decorative-qr">
                        <Icon name="qr" />
                    </div>
                    <div>
                        <b>
                            ONE DOCUMENT.
                            <br />
                            ONE IDENTITY.
                        </b>
                        <span>QR-powered access</span>
                    </div>
                </div>
                <span className="document-stamp">
                    READY
                    <br />
                    TO GO! ↗
                </span>
            </div>
            <span className="art-sticker sticker-bottom">
                <span>✦</span> BIG IDEAS.
                <br /> ORGANIZED.
            </span>
            <span className="art-spark">✦</span>
            <div className="art-caption">
                A little structure. A lot of possibility. <span>↗</span>
            </div>
        </div>
    );
};

export default DocumentArtwork;
