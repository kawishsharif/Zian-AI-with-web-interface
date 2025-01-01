// define prop types
type Props = {
    heading: string;
    content: React.ReactNode;
  }
  // create a usecasedetail component which have heading and content as per page requirement ,set classname so we can over-write the properties 
  export default function TermsPrivacyComponent({ heading, content }: Props) {
    return (
      <div className="space-y-1 md:space-y-3">
        <h1 className={`md:text-xl text-base font-bold text-white font-jakarta`}>
          {heading}
        </h1>
        <p className="md:text-base text-sm font-normal text-white/70 font-jakarta">
          {content}
        </p>
      </div>
    );
  }