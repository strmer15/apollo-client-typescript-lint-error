import { useQuery, gql } from '@apollo/client';
import { FunctionComponent, useEffect, useState } from 'react';

const COUNTRIES = gql`
  query {
    countries {
      code
      name
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

export const CountryList: FunctionComponent = () => {
  const [shouldRefetch] = useState(false);

  const { loading, error, data, refetch } =
    useQuery<{ countries: Array<{ name: string }> }>(COUNTRIES);

  useEffect(() => {
    if (shouldRefetch) {
      void refetch();
    }
  }, [error, refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      {data?.countries.map((country) => {
        return <div className="list-group-item">{country.name}</div>;
      })}
    </>
  );
};
