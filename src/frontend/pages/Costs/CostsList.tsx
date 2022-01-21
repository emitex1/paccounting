import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';

import useApiCall from '../../helpers/apiTools';
import ICost from '../../types/ICost';
import { addCommas } from '../../helpers/formatters';
import { toUKLongDate } from '../../helpers/dateTools';

const CostsList = () => {

  const { dataArray: costs, dataReady, isLoading, errorMessage } = 
  useApiCall<ICost>(
    '/my-costs',
    { 'userId': '61e08a74927d9e1bc3cfbe79' },
  );

  const styles = {
    row: tw`text-gray-600 cursor-pointer hover:text-gray-900 hover:font-bold odd:bg-gray-100`,
    cell: tw`p-6`,
    card: tw`bg-white rounded-lg my-4`,
  };

  // TODO: Add Card Design with toggle button
  // TODO: Improve UI
  return (
    <div tw='w-8/12 mx-auto my-5'>
      <h1 tw='mx-auto my-5 text-indigo-500 text-center'>Costs List</h1>

      <div tw=''>

        { isLoading && <span>Is Loading ...</span> }

        { ! isLoading && errorMessage && <span>Error: {errorMessage}</span> }

        <div tw='md:hidden'>
          {
            dataReady && costs.map((cost: ICost, index: number) => (
              <div key={index} css={[styles.card]}>
                <div css={[styles.cell]}>
                  {cost.title}
                </div>
                <div css={[styles.cell]}>
                  {addCommas(cost.amount)}
                </div>
                <div css={[styles.cell]}>
                  {toUKLongDate(cost.date)}
                </div>
                <div css={[styles.cell]}>
                  {cost.primaryCat.title}
                </div>
                <div css={[styles.cell]}>
                  {cost.secondaryCat.title}
                </div>
                <div css={[styles.cell]}>
                  {cost.tags}
                </div>
                <div css={[styles.cell]}>
                  {cost.isUnexpected ? '✔' : '❌'}
                </div>
                <div css={[styles.cell]}>
                  {cost.description}
                </div>
              </div>
            ))
          }
        </div>

        <table tw='w-full bg-white rounded-lg hidden md:block'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Primary Cat</th>
              <th>Secondary Cat</th>
              <th>Tags</th>
              <th>Is Unexpected</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              dataReady && costs.map((cost: ICost, index: number) => (
                <tr key={index} css={[styles.row]}>
                  <td css={[styles.cell]}>
                    {cost.title}
                  </td>
                  <td css={[styles.cell]}>
                    {addCommas(cost.amount)}
                  </td>
                  <td css={[styles.cell]}>
                    {toUKLongDate(cost.date)}
                  </td>
                  <td css={[styles.cell]}>
                    {cost.primaryCat.title}
                  </td>
                  <td css={[styles.cell]}>
                    {cost.secondaryCat.title}
                  </td>
                  <td css={[styles.cell]}>
                    {cost.tags}
                  </td>
                  <td css={[styles.cell]}>
                    {cost.isUnexpected ? '✔' : '❌'}
                  </td>
                  <td css={[styles.cell]}>
                    {cost.description}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div> {/* Container */}
    </div>
  );
};

export default CostsList;
