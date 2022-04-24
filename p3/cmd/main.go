package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/mahgoh/palletpals-proxy/internal/config"
	"github.com/mahgoh/palletpals-proxy/internal/proxy"
	"github.com/morikuni/aec"
)

var (
	c *config.Config
)

func init() {
	configFlag := flag.String("config", "default", "config")
	flag.Parse()

	configPath := fmt.Sprintf("config/%s.json", *configFlag)

	var err error
	c, err = config.NewConfig(configPath)
	if err != nil {
		fmt.Println("Could not load config:", err)
		os.Exit(1)
	}

	fmt.Printf("Config loaded: %s\n", *configFlag)
}

func main() {

	backendProxy, err := proxy.NewProxy(c.Backend)
	if err != nil {
		panic(err)
	}

	frontendProxy, err := proxy.NewProxy(c.Frontend)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api/") {
			backendProxy.ServeHTTP(w, r)
			print("Server", aec.GreenF, r)
		} else {
			frontendProxy.ServeHTTP(w, r)
			print("Client", aec.BlueF, r)
		}
	})

	log.Fatal(http.ListenAndServe(":80", nil))
}

func print(tier string, color aec.ANSI, r *http.Request) {
	tier = fmt.Sprintf("[%s%s%s]", color, tier, aec.Reset)
	method := fmt.Sprintf("%s%-4s%s", aec.MagentaF, r.Method, aec.Reset)

	fmt.Printf("%s %s %s\n", tier, method, r.URL.Path)
}
