import OSS from "ali-oss";

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-beijing",
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: "LTAI5tC8kTqenE6EUQoQTx63",
  accessKeySecret: "rjM8GJtrWx3MMCmLXBYYXvTitH8Ka2",
  bucket: "lc-assets",
});

export const ossPut = ({
  fileName,
  filePath,
}: {
  fileName: string;
  filePath: string;
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // @ts-ignore
      const result: any = await client.multipartUpload(fileName, filePath);

      resolve(result?.res?.requestUrls[0]);
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};
