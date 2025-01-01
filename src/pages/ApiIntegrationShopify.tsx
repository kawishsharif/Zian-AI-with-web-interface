import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { CopyAPIKeyButton, PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";
import { Link } from "react-router-dom";
import CodeViewer from "@/components/CodeViewer";



const pythonCode = `url = 'https://seo.zian.ai/api?limit=52&offset=0&image_url=1'
api_token = '0xxxxxxxxxx1446f512a4c18150e1e936f2189393d3e040be330d75b173cdc'
# create one uuid on the site: https://www.uuidgenerator.net/version4
uuid = 'dfdfda8d-1f11-49f5-924c-48a7ec6f5791'
headers = {'Authorization': api_token}
r = requests.get(url, headers=headers)
result = r.json()['articles']
output = []

store = StoreClient(uuid)
for item in result:
    aid = item['id']
    store_result = store.get(f'{aid}')
    print(f'aid: {aid}, store: {store_result}')
    if not store_result:
        article_html = item['article'].replace("\\n","<br />")
        item['article_html'] = article_html
        output.append(item)
        store.set(f'{aid}', 'true');
        print(f'Set the id on store: {aid}')`;



export default function ApiIntegrationShopify() {
    const { authUser } = useAuthUserStore()

    return (
        <MainLayout heading="INTEGRATE API">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="py-3 md:py-[30px]  h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="max-h-full px-3 space-y-2 overflow-y-auto md:px-[30px] md:space-y-7 ">
                        <div className="">
                            <h1 className="text-xl font-bold text-white font-jakarta ">
                                API Key
                            </h1>
                            <div className="relative mt-[10px]">
                                <Input
                                    className="pr-24"
                                    readOnly
                                    value={authUser?.authorization}
                                />
                                <CopyAPIKeyButton />
                            </div>
                            <div className="mt-3 md:mt-5  mb-[15px]" >
                                <p className="text-base font-bold text-white lg:text-xl font-jakarta">
                                    Select your Integration:
                                </p>
                                <div className="mt-3 md:mt-5  flex md:flex-row flex-col gap-[10px]   mb-[15px]">
                                    <Link to="/wordpress">
                                        <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                                            Wordpress Integration
                                        </PrimaryBtnNeon>
                                    </Link>
                                    <Link to="/shopify">
                                        <PrimaryBtn className="font-normal text-[15px] w-full md:w-auto">
                                            Shopify Integration Via Zapier
                                        </PrimaryBtn>
                                    </Link>
                                    <Link to="/wix">
                                        <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                                            Wix Integration Via Zapier
                                        </PrimaryBtnNeon>
                                    </Link>
                                </div>

                            </div>
                            <hr className="border-2 border-primary " />
                            <div>
                                <a
                                    href="https://docs.google.com/document/d/1YK_yh04swIcRPYfkMY8BRxbgVo0S7unT8d-Oy_Y47fk"
                                    target="_blank"
                                    className="mt-2 inline-flex items-center gap-2 underline text-primary ps-1"
                                >
                                    Or view on Google Docs here <ExternalLinkIcon className="mt-[3px]" />
                                </a>
                                <h2 className="md:text-[32px] text-2xl font-bold font-jakarta text-white my-4 md:my-[30px]">
                                    Shopify Integration Via Zapier
                                </h2>
                                <hr className="border border-white/10" />
                                <h2 className="mt-3 md:mt-5  mb-[5px] text-base lg:text-xl font-bold font-jakarta">
                                    Tools Needed:
                                </h2>
                                <ol className="text-sm font-normal list-decimal text-white/70 md:text-base font-jakarta px-[18px]">
                                    <li className="">
                                        <span className="ps-1">Your Zian SEO API</span>
                                    </li>
                                    <li className="">
                                        <a href="https://zapier.com/" target="_blank" className="inline-flex items-center gap-2 underline text-primary ps-1">
                                            Zapier <ExternalLinkIcon className="mt-[3px]" />
                                        </a>
                                        {" "} (free account won’t work, you need at least the cheapest Starter $19/mo plan)
                                    </li>
                                    <li className="">
                                        <a href="https://www.uuidgenerator.net/version4" target="_blank" className="inline-flex items-center gap-2 underline text-primary ps-1">
                                            UUID Generator <ExternalLinkIcon className="mt-[3px]" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://admin.shopify.com" target="_blank" className="inline-flex items-center gap-2 underline text-primary ps-1">
                                            Your Shopify Login <ExternalLinkIcon className="mt-[3px]" />
                                        </a>
                                    </li>
                                </ol>
                                <div className="mt-3 md:mt-5  space-y-[10px]">
                                    <div className="mb-2">
                                        <VideoComponent />
                                    </div>
                                    <a href="https://www.loom.com/share/55bd2943e2b54559a85ae44695671b99" target="_blank" className="text-base font-normal text-white underline font-jakarta">
                                        Creating a Zapier Integration with Shopify using Code by Zapier
                                    </a>
                                    <hr className="border-white/10 border mt-3 md:mt-[10px]" />
                                </div>
                                <h2 className="mt-3 text-base font-bold text-white lg:text-xl md:mt-5 font-jakarta">
                                    Steps:
                                </h2>
                                <div className="mt-[10px] text-base font-normal text-white leading-[26px] max-w-[1050px] w-full ">
                                    <ol className="list-decimal px-[18px]">
                                        <li>
                                            Navigate to Zapier {">"} Create Zap (you should watch the video above)
                                        </li>
                                        <li>
                                            Select: Run <span className="underline">Python</span> Code as the trigger {">"}Paste the below code and edit:<br />
                                            <span className="lg:pl-3">
                                                a. Replace the api_token = with your Zian API token. Between then ‘ ‘
                                            </span>
                                            <br />
                                            <span className="lg:pl-3">
                                                b. Create a uuid (using the free link above) and replace the uuid = in the code snippet between then ‘ ‘
                                            </span>
                                            <div className="-ml-[18px]">
                                                <img src="/images/python-shopify.png" alt="" className="w-[634px] h-auto  my-5" />
                                                <CodeViewer language="python" code={pythonCode} />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="block py-2">
                                                Save step in Zapier, run test. <strong>If it produces an error</strong>, just run the test again and again. <br />
                                                <strong>* If you get error</strong> saying “Task timed out after 1.00 second”, you need to upgrade from <br />
                                                free Zapier account to cheapest Zapier account.
                                            </span>
                                            <div className="-ml-[18px] mt-2">
                                                <img src="/images/shopify-python.png" alt="" className="md:w-[634px] w-full h-auto" />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="block py-2">
                                                Connect Shopify app {">"} Configure shopify step with correct fields in the zap as below:
                                                <br />
                                                <strong>*NOTE:</strong> For correct Shopify formatting, in the “Content” field select ‘Article HTML”
                                            </span>
                                            <div className="-ml-[18px] mt-2">
                                                <img src="/images/shopify-blog.png" alt="" className="md:w-[634px] w-full h-auto" />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="block py-2">
                                                Run Shopify test, check Shopify account, then <strong>save & turn on Zap. You’re finished!</strong> 🎉
                                            </span>

                                        </li>
                                    </ol>
                                </div>


                            </div>


                        </div>


                    </div>

                </div>

            </GrBorderBox>
        </MainLayout >
    );
}








function VideoComponent() {


    return (
        <div className="">
            <div className="relative w-full md:w-[500px]">
                <iframe width={500} height={300} src="https://www.loom.com/embed/6e0e77ef595f4e488e8636a1d03770dc?sid=1c27efb4-bbb7-4d21-a14d-7d5e897fd125" className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video"> </iframe>
            </div>
        </div>
    )
}

// function VideoComponent() {

//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [showBtn, setShowBtn] = useState(false);


//     useEffect(() => {
//         videoRef.current?.addEventListener("play", function () {
//             if (!videoRef.current) return;
//             setShowBtn(!videoRef.current.paused)
//         })
//     }, [videoRef])


//     const onPlayVideoClicked = async () => {
//         if (!videoRef.current) return;
//         await videoRef.current.play()
//         videoRef.current.controls = true;
//     }

//     return (
//         <div className="">
//             <div className="relative w-full md:w-[500px]">
//                 <video ref={videoRef} src="/videos/test_video.mp4" width={500} height={300} className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video" />
//                 <button onClick={onPlayVideoClicked} className={cn(
//                     "aspect-square p-7 bg-transparent/60 flex items-center justify-center border rounded-full",
//                     "absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2",
//                     showBtn && "hidden"
//                 )}>
//                     <FontAwesomeIcon className="w-6 h-6 text-lg text-white" icon={faPlay} />
//                 </button>
//             </div>
//         </div>
//     )}


