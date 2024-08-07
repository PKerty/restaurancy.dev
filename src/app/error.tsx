"use client";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);

  return <div>Something went wrong, try again!</div>;
}

//https://docs.google.com/spreadsheets/d/e/2PACX-1vTHLDA5D3Kol92Qe28b-4mXeD-mJlWYJSdR2T13Z5m_q5cKXa97rGTu0uC_ND2EKdAACvMpMAf0ChN8/pub?output=csv
