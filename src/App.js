import React, { Component } from 'react';
import { ReactiveBase, 
DataSearch, 
ReactiveList, 
ResultCard } from '@appbaseio/reactivesearch';

class App extends Component {
  render() {
    return (
      <section className="container">
      <ReactiveBase url="http://localhost:9200" app="ancient" enableAppbase={false}>


          <DataSearch
              componentId="searchbox"
              dataField={[
                {
                  field: "character.keyword",
                  weight: 3,
                },
              ]}
              placeholder="Search for IAST characters..."
            />
          <ReactiveList
            componentId="results"
            size={8}
            pagination={true}
            react={{
              and: [
                "searchbox",
              ],
            }}
            render={({ data }) => (
              <ReactiveList.ResultCardsWrapper>
                {data.map((item) => (
                  <ResultCard key={item._id}>
                  <ResultCard.Image src={item.url}/>
                    <ResultCard.Title
                      dangerouslySetInnerHTML={{
                        __html: item.file_name,
                      }}
                    />
                    <ResultCard.Description>
                      <div>
                        {item.character}
                      </div>
                    </ResultCard.Description>
                  </ResultCard>
                ))}
              </ReactiveList.ResultCardsWrapper>
            )}
          />
      </ReactiveBase>
      </section>
    );
  }
}
export default App;