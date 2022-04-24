package config

import (
	"encoding/json"
	"os"
)

type Config struct {
	Backend  string
	Frontend string
}

func (c *Config) Load(configFile string) error {
	data, err := os.ReadFile(configFile)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, c)
}

func NewConfig(configFile string) (*Config, error) {
	config := &Config{}
	err := config.Load(configFile)
	if err != nil {
		return nil, err
	}
	return config, nil
}
