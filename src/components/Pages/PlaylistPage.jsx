import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Card, List, Skeleton, Divider, Input, Menu, Dropdown, Button, notification } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { getData } from "../../utils/api";
import Section from "../Section";
import { ellipsGenerator } from "../../utils/ui";

const { Title, Text } = Typography;

const PlaylistPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    getPlaylistData();
  }, []);


  const getPlaylistData = () => {
    setLoading(true);
    let url = "/api/playlist/12";
    getData(url)
      .then((resp) => {
        if (resp?.datas) {
          setData(resp.datas);
          setFilteredData(resp.datas);
        } else {
          showAlert("error", "Error", "Failed to fetch data");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showAlert("error", "Error", "Failed to fetch data");
      });
  };

  const showAlert = (status, title, description) => {
    api[status]({
      message: title,
      description: description,
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(value, selectedGenre);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    applyFilters(searchText, genre);
  };

  const applyFilters = (searchText, genre) => {
    const filtered = data.filter((item) => {
      const matchesGenre = genre === "All" || item.play_genre.toLowerCase() === genre.toLowerCase();
      const matchesSearchText =
        item.play_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.play_genre.toLowerCase().includes(searchText.toLowerCase()) ||
        item.play_description.toLowerCase().includes(searchText.toLowerCase());
      return matchesGenre && matchesSearchText;
    });
    setFilteredData(filtered);
  };

  // Genre Menu for Dropdown
  const genreMenu = (
    <Menu onClick={(e) => handleGenreChange(e.key)}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Music">Music</Menu.Item>
      <Menu.Item key="Song">Song</Menu.Item>
      <Menu.Item key="Movie">Movie</Menu.Item>
      <Menu.Item key="Education">Education</Menu.Item>
      <Menu.Item key="Others">Otherss</Menu.Item>
    </Menu>
  );

  return (
    <Section topMd={100} topLg={80} topXl={60}>
      <div className="layout-content">
        {contextHolder}

        <Row gutter={[24, 0]}>
          <Col xs={24} lg={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full w-full">
              <Title>Playlist</Title>
              <Divider />

              <Row gutter={[24, 0]} align="middle" style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input
              placeholder="Search here..."
              prefix={<SearchOutlined />}
              className="header-search"
              allowClear
              size="large"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Col>
          <Col>
            <Dropdown overlay={genreMenu} trigger={['click']}>
              <Button size="large">
                {selectedGenre} <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>

              {isLoading ? (
                <Skeleton active />
              ) : filteredData.length > 0 ? (
                <List
                  grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                  dataSource={filteredData}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={<img alt={item.play_name} src={item.play_thumbnail} />}
                        onClick={() => window.open(item.play_url, "_blank")}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Meta
                          title={<Text>{item.play_name}</Text>}
                          description={
                            <>
                              <Text ellipsis={ellipsGenerator(item.play_description)}>
                                {item.play_description}
                              </Text>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                "No data available"
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Section>
  );
};

export default PlaylistPage;
