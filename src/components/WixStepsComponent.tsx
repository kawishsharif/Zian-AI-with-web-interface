import CodeViewer from "./CodeViewer";



const pythonCode1 = `url = 'https://seo.zian.ai/api?limit=52&offset=0&image_url=1'
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


const pythonCode2 = `api_key = 'IST.eyJraWQiOiJxxxxxxxxxxxx0.eyJkYXRhIjoie1wiaWRcIjpcIjkyZTBjNjFhLThjZjMtNDU0Y\nS05NGUzLTdkZjY5Y2I5MDQyNFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwi\nLFwiaWRcIjpcIjQ1OTliZDQyLTFmZGxxxxxxxx1hZDk2LWQxNjhiMWQ4YzQ2YlwifSxcInRlbmFudFw\niOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJlNzU1MzJlMy1kODNkLTRlZTAtYjBmMi1kN2\nY2MWI0NzRkYThcIn19IiwiaWF0IjoxNjk1NzM3Nzk0fQ.f4sJQKmS_05BQywhsdDHnSFg-yuKvXg8_J\n6WdbEh_ZgcTvahDWs2DVCY4sfVe7GrbRt38nXiC0Jb1np7I7L6JGcwq8GX91lbpimvlsgni07uyDuU7\n18jMVL-xTY1610FlnIPXZVSltctVG5oM4Gmsyk6rdaL-9Z3KczS8PZoM5z2vfJHqzjvyl-jW8yCilHF\n4Yu9eiekdu73dlDNtbagiVGJaoKid5cqpBWjHYkcOvadvKRkcWe9ykp2J8_qMCKroMDhz3vYmJq4-Xz\n0cXRnfVWIPb8cmzSFQmPZc6YhF9U11XRhWamZe0f-fOz4vJr7Y_XHKbdaSAganDRD5CeV2A'
site_id = 'xxxxxxxx-d6dc-4ce3-8ff5-d8ac003089fd'
account_id = 'xxxxxxx-d83d-4ee0-b0f2-d7f61b474da8'

url = 'https://www.wixapis.com/blog/v3/draft-posts'
img_url = 'https://www.wixapis.com/site-media/v1/files/import'
member_url = 'https://www.wixapis.com/members/v1/members'
headers = {
  'Authorization': api_key, 
  'wix-account-id': account_id, 
  'wix-site-id': site_id, 
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0'
}
output = inputData

try:
    r = requests.get(member_url, headers=headers)
    memberId = r.json()['members'][0]['id']

    nodes = []
    item = inputData
    print(f'item id: {item["id"]}')
    paras = item['article'].split('\\n\\n')

    for p in paras:
        nodes.append(
        {
            "type": "PARAGRAPH",
            "id": "",
            "nodes": [            {
              "type": "TEXT",
              "id": "",
              "nodes": [],
              "textData":               {
                "text": p,
                "decorations": []
              }
            }],
            "paragraphData":             {
              "textStyle": {"textAlignment": "AUTO"},
              "indentation": 0
            }
         }
        )
    img_data = {
        'url': item['image'],
        'mimeType': "image/jpeg",
    }
    r = requests.post(img_url, headers=headers, json=img_data)
    try:
        result = r.json()
        print(f'image result: {result}')
    except Exception as e:
        print(e)
        print(f'image result: {r.text}')
        raise e

    #import time
    #time.sleep(3)

    nodes.insert(0,
        {
            "type": "IMAGE",
            "id": "",
            "nodes": [
              {
                "type": "IMAGE",
                "id": "",
                "nodes": [],
                "imageData": {
                  'image': {
                      'src': {
                          'url': result['file']['url'],
                          #'url': item['image'],
                      }
                  }
                }
              }
            ],
            "imageData":  {
              'containerData': {
                'width': {
                  'size': 'CONTENT',
                },
                'alignment': 'CENTER',
              },
              'image': {
                  'src': {
                      #'url': result['file']['url'],
                      'url': item['image'],
                  }
              }
            }
         }
    )

    data = {
        "draftPost": {
            "title": item['headline'],
            "richContent": {
                "nodes": nodes,
            },
            'memberId': memberId,
            "heroImage": {
                'id': result['file']['id'],
                'url': result['file']['url'],
            },
            'media': {
                'displayed': False,
                'custom': True,
                #'embedMedia': {
                #    'thumbnail': {
                #        'url': result['file']['url'],
                #        #'url': item['image'],
                #        'width': 800,
                #        'height': 800,
                #    }
                #},
                'wixMedia': {
                    'image': {
                        'id': result['file']['id'],
                        'url': result['file']['url'],
                    }
                }
            },
        },
        "publish": True,
    }
    r = requests.post(url, headers=headers, json=data)
    print(f'status: {r.status_code}')
    print(f'result: {r.text}')
except Exception as e:
    print(e)`


export default function WixSteps() {
  return (
    <>
      <div className="mt-3 md:mt-5  space-y-[10px]">
        <div className="mb-2">
          <VideoComponent />
        </div>
        <a
          href="https://www.loom.com/share/55bd2943e2b54559a85ae44695671b99"
          target="_blank"
          className="text-base font-normal text-white underline font-jakarta"
        >
          Creating a Zapier Integration with Wix using Code by Zapier
        </a>
        <hr className="border-white/10 border mt-3 md:mt-[10px]" />
      </div>
      <h2 className="mt-3 text-base font-bold text-white lg:text-xl md:mt-5 font-jakarta">
        Steps:
      </h2>
      <div className="mt-[10px] text-base font-normal text-white leading-[26px] max-w-[1050px] w-full ">
        <ol className="list-decimal px-[18px]">
          <li>
            Navigate to Zapier {">"} Create Zap  (you should watch the video
            above)
          </li>
          <li>
            Select: Run Python Code as the trigger {">"}Paste the below code and
            edit:
            <br />
            <span className="lg:pl-3">
              a. Replace the api_token = with your Zian API token. Between then
              ‘ ‘
            </span>
            <br />
            <span className="lg:pl-3">
              b. Create a uuid (using the free link above) and replace the uuid
              = in the code snippet between then ‘ ‘
            </span>
            <div className="-ml-[18px]">
              <img
                src="/images/wix-python.png"
                alt=""
                className="w-[634px] h-auto  my-5"
              />
              <div className="-ml-[18px]">
                <CodeViewer language="python" code={pythonCode1} />
              </div>
            </div>
          </li>
          <li>
            <span className="block py-2">
              Save step in Zapier, run test. If it produces an error, just run the test again and again.
            </span>
            <div className="-ml-[18px]">
              <img
                src="/images/python-wix.png"
                alt=""
                className="md:w-[634px] w-full h-auto"
              />
            </div>
          </li>
          <li>
            <span className="block py-2">
              Navigate to Wix to get your API Key and
              account id:
              <br />
              <a
                href="https://manage.wix.com/account/api-keys"
                target="_blank"
                className="underline text-primary font-bold font-jakarta leading-[20px] lg:leading-[100%]"
              >
                https://manage.wix.com/account/api-keys
              </a>
              <div className="flex flex-col gap-2 pl-6 mt-2 text-sm">
                <p className="flex gap-2 font-normal font-jakarta">
                  a.
                  <span className="">
                    - Click ``Copy ID`` to copy ``account id``
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  b. <span className="">- Click ``Generate API Key``</span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  c.
                  <span className="">- Click ``All site permissions``</span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  d.
                  <span className="">
                    - Select permissions: ``Wix Blog`` and ``Manage Site Media``{" "}
                    {"( "}or you can select “all”
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  e. <span className="">- Click ``Generate Key``</span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  f. <span className="">- Copy the key to safe somewhere</span>
                </p>
              </div>
            </span>
          </li>
          <li>
            <span className="block py-2">
              Get your site_id:
              <br />
              <div className="flex flex-col gap-2 pl-6 mt-2 text-sm">
                <p className="flex gap-2 font-normal font-jakarta">
                  a.
                  <span className="">
                    Go to {" "}
                    <a
                      href="https://manage.wix.com/account/sites?referralAdditionalInfo=Route"
                      className="underline ps-1 text-primary"
                    >
                      https://manage.wix.com/account/sites?referralAdditionalInfo=Route
                    </a>
                    , then hover <br /> the blog site, and select ``Select & Edit Site``,
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  b.
                  <span className="">
                    click it, then go to the site, and copy the ``site_id`` from the
                    url {"("} the code between the <br /> brackets:
                  </span>
                </p>
              </div>
            </span>
            <div className="-ml-[18px]">
              <img
                src="/images/wax-site-id.png"
                alt=""
                className="md:w-[634px] w-full h-auto"
              />
            </div>
          </li>
          <li>
            <span className="block py-2">
              Set the second step in Zapier. Code by Zapier {">"} Python {" > "}{" "}
              Add input data
              <br />
              <div className="flex flex-col gap-2 pl-6 mt-2 text-sm">
                <p className="flex gap-2 font-normal font-jakarta">
                  a.
                  <span className="">
                    Create ``Input Data`` map
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  b.
                  <span className="">
                    - ``headline`` : ``Headline`` <br />
                    - ``id`` : ``ID``<br />
                    - ``article`` : ``Article``<br />
                    - ``summary`` : ``Summary``<br />
                    - ``image`` : ``Image``<br />
                    - ``article_html`` : ``Article Html``
                    <br /><br />
                    Example:
                    <br />
                    <img
                      src="/images/wax-action.png"
                      alt=""
                      className="w-[512px] h-auto mt-2"
                    />
                  </span>
                </p>
              </div>
            </span>
          </li>
          <li>
            <span className="block py-2">
              Paste the code below and configure to match the
              screenshot. Change the items:
              <br />
              <div className="flex flex-col gap-2 pl-6 mt-2 text-sm">
                <p className="flex gap-2 font-normal font-jakarta">
                  a.
                  <span className="">
                    ``api_key``,
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  b.
                  <span className="">
                    ``site_id``, and
                  </span>
                </p>
                <p className="flex gap-2 font-normal font-jakarta">
                  c.
                  <span className="">
                    ``account_id``
                  </span>
                </p>
              </div>
            </span>
            <div className="-ml-[18px]">
              <CodeViewer language="python" code={pythonCode2} />
            </div>
          </li>
          <li>
            <span className="block py-2">
              Run test, check Wix account, then save & turn
              on Zap. You’re finished! 🎉
              <br />
              <div>
                <p className="py-2">Example:</p>
                <img
                  src="/images/wix-last-step.png"
                  alt=""
                  className="w-[512px] h-auto"
                />
              </div>
            </span>

          </li>
        </ol>
      </div >

    </>
  );
}

function VideoComponent() {
  return (
    <div className="">
      <div className="relative w-full md:w-[500px]">
        <iframe
          width={500}
          height={300}
          src="https://www.loom.com/embed/ea53704bf2fb4a9b88bcabacc5a211c2?sid=b5590f8d-0c1c-4b22-85f7-fc070909d368"
          className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video"
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
}
