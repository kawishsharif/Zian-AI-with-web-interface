import TermsPrivacyComponent from "@/components/TermsPrivacyComponent";
import GrBorderBox from "@/components/ui/gr-border-box";





export default function PrivacyPage() {

    return (
        <div className="h-screen py-10 overflow-y-auto ">
            <GrBorderBox className="max-w-5xl mx-4 lg:mx-auto ">
                <div className="flex flex-col rounded-20 items-center bg-gr-purple-light  text-white space-y-7 py-5 pb-20 px-4 md:px-8">
                    <div>
                        <img src="/images/avatar.png" alt="" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-normal font-nebula md:text-3xl w-full">
                            Privacy Policy for Zian AI
                        </h1>
                    </div>
                    <div className="space-y-3 overflow-y-auto md:space-y-[30px] ">
                        <TermsPrivacyComponent
                            heading="Introduction"
                            content={
                                <>
                                    This Privacy Policy explains how Zian AI ("we", "us", or "our") collects, uses, and discloses information about you when you access or use our Services.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Personal Information Collection"
                            content={
                                <>
                                    We collect personal information that you provide to us directly when you use our Services. This includes information you provide when you create an account, make a purchase, or communicate with us. The types of information we collect may include your name, email address, postal address, and payment information. In addition, we collect information about your interactions with our Services.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Purpose of Data Collection"
                            content={
                                <>
                                    We use the information we collect to provide, maintain, and improve our Services. We also use the information we collect to personalize your experience, to send you information about our Services, respond to your inquiries, and for other customer service purposes.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Data Sharing and Disclosure"
                            content={
                                <>
                                    We may share your information with third-party vendors, consultants, and other service providers who perform services or functions on our behalf. We may also share your information to comply with the law, to protect the rights and property of Zian AI, our users, and others, or in connection with a sale or transfer of assets.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Data Storage and Security"
                            content={
                                <>
                                    We take reasonable measures to protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, the Internet is not 100% secure and we cannot guarantee the security of your information.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="User Rights and Choices"
                            content={
                                <>
                                    You may update, correct, or delete your account information at any time by contacting us. Please note that we may retain certain information as required by law or as necessary for our business purposes.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Use of Cookies and Other Technologies"
                            content={
                                <>
                                    We use cookies and other tracking technologies to collect information about your use of our Services. We use this information to improve our Services, to analyze trends, to administer our Services, and to understand how users interact with our Services.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Children's Privacy"
                            content={
                                <>
                                    Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Changes to Privacy Policy"
                            content={
                                <>
                                    We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide additional notice.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Contact Information"
                            content={
                                <>
                                    If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:hello@zian.ai" className="underline text-white"> hello@zian.ai
                                    </a>
                                </>
                            } />
                    </div>
                </div>
            </GrBorderBox>
        </div>

    );
}