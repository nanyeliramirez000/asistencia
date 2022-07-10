import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @ViewChild('aboutCompany') aboutCompany: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  public one: boolean = false;
  public two: boolean = false;
  public three: boolean = false;
  public four: boolean = false;
  public five: boolean = false;
  public six: boolean = false;
  public seven: boolean = false;
  public eigth: boolean = false;
  public nine: boolean = false;

  public isLoading: boolean = false;

  public redired: string = '';
  public logo: string = '';
  public cuota: string = '';
  public about: string = '';
  public email: string = '';

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private scroll: ViewportScroller,
    private scrollService: ScrollService
  ) {
    this.changeDeltain('scotiabank');
    this.redired = 'https://appservtrx.scotiabank.cl/simulador/';
    this.logo =
      'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-santander.png';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        document.getElementsByClassName('onlyHome')[0].remove();
      } catch (error) {}
    }, 0);
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((params: ParamMap) => {
      const identifier = params.get('bank');
      if (!identifier || !identifier.length || identifier.length < 3) {
        this.router.navigate(['simulator']);
        return false;
      }
      this.changeDeltain(identifier);
      return true;
    });
  }

  goToSimulator() {
    document.location.href = this.redired;
  }

  changeDeltain(current: string) {
    this.one = false;
    this.two = false;
    this.three = false;
    this.four = false;
    this.five = false;
    this.six = false;
    this.seven = false;
    this.eigth = false;
    this.nine = false;

    if (current === 'scotiabank') {
      this.one = true;
      this.cuota = '$146.253';
      this.email = 'mailto:contacto@scotiabank.cl';
      this.redired = 'https://appservtrx.scotiabank.cl/simulador';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/scotiabank.png';
      this.about =
        'Scotiabank está presente en nuestro país desde el año 1990, tras ingresar a la propiedad del Banco Sud Americano. En 2007 amplió su presencia en el mercado al adquirir Banco del Desarrollo, incorporando nuevos segmentos de negocios. Siguiendo con su estrategia de crecimiento, en 2010 compró las operaciones de Banca Mayorista de Bank of Royal Scotland. Con cerca de 3.800 empleados, el objetivo principal de Scotiabank Chile es ayudar a sus clientes a mejorar su situación financiera, otorgándoles soluciones adecuadas y proporcionándoles una completa gama de productos y servicios financieros a través de su red de 137 Sucursales de Arica a Punta Arenas.';
    } else if (current === 'itau') {
      this.two = true;
      this.cuota = '$142.886';
      this.email = 'mailto:HelpDesk.RemoteBankingChile@itau.cl';
      this.redired =
        'https://ww2.itau.cl/personas/creditos/credito-de-consumo-universal-de-itau';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-itau.png';
      this.about =
        'El Banco Itaú S.A. es un banco brasileño. brazo de Itaú Holding. con sede en São Paulo. y el mayor de Latinoamérica. después de su fusión con Unibanco. Banco Itaú comenzó sus actividades oficiales en Chile el 26 de febrero de 2007.';
    } else if (current === 'ripley') {
      this.three = true;
      this.cuota = '$150.420';
      this.email = 'mailto:serviciosfinancieros@ripley.cl';
      this.redired = 'https://www.bancoripley.cl/simulador-credito-de-consumo';
      this.logo =
        'https://s3.amazonaws.com/marketplace.comparaonline.com/marketplace/logos/divisions/bancoRipley.png';
      this.about =
        'Banco Ripley es una Sociedad Anónima Especial regulada por la Ley General de Bancos y fiscalizada por la Superintendencia de Bancos e Instituciones Financieras y sus acciones no son transadas en la Bolsa de Valores. Se obtuvo la autorización de existencia por parte de la Superintendencia de Bancos e Instituciones Financieras (SBIF), la cual aprobó sus estatutos según resolución N° 40, de fecha 2 de mayo de 2002, siendo autorizada por esta misma institución para comenzar sus actividades el día 13 de mayo de 2002, dando inicio a sus operaciones comerciales el 17 de mayo de 2002.';
    } else if (current === 'bchile') {
      this.four = true;
      this.cuota = '$146.167';
      this.email = 'mailto:contacto@banchile.cl';
      this.redired =
        'https://portales.bancochile.cl/personas/simulador-credito-de-consumo';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-de-chile.png';
      this.about =
        'Desde su fundación en el año 1893. el Banco de Chile ha liderado el mercado financiero chileno. Ha sido un actor fundamental para el progreso y desarrollo económico-social de Chile. Su propósito es generar condiciones para el desarrollo de las personas y las empresas. acompañándolos con soluciones adecuadas a sus diferentes etapas en ese proceso de desarrollo. Las operaciones se organizan en torno a seis principales segmentos: operaciones de grandes corporaciones. de pequeñas y medianas empresas. mercado de las personas. mercado de consumo. actividades bancarias internacionales y operaciones del mercado de valores. Adicionalmente. las empresas filiales completan la gama de servicios financieros con operaciones de securitización. de corretaje de valores. de inversión y fondos mutuos. de seguros. asesoría financiera y factoring. entre otras.';
    } else if (current === 'coopeuch') {
      this.five = true;
      this.cuota = '$148.073';
      this.email = 'mailto:ventas@coopeuch.cl';
      this.redired = 'https://www.coopeuch.cl/personas/credito-consumo.html';
      this.logo =
        'https://s3.amazonaws.com/marketplace.comparaonline.com/marketplace/logos/divisions/coopeuch.png';
      this.about =
        'Coopeuch es una Cooperativa que cumple 50 años ayudando a mejorar la calidad de vida de sus socios y sus familias. Cuentan con la confianza de más de 670 mil mujeres y hombres en todo Chile. Actualmente son una de las principal cooperativa de ahorro y crédito de Chile y la más importante a nivel latinoamericano.';
    } else if (current === 'santander') {
      this.six = true;
      this.cuota = '$141.312';
      this.email = 'mailto:';
      this.redired =
        'https://banco.santander.cl/personas/credito-de-consumo/simulador';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-santander.png';
      this.about =
        'Presente en el país desde 1978, en la actualidad Banco Santander Chile es una institución financiera líder, tanto por participación de mercado como por solidez patrimonial y rentabilidad. Las razones de este liderazgo pueden encontrarse en la estrategia seguida desde entonces, basada en la especialización en el negocio financiero, innovación en productos, cuidado de los riesgos, calidad de servicio hacia el cliente y una activa participación en el mercado local, que se complementa con la red internacional que Grupo Santander posee en todo el mundo.';
    } else if (current === 'estado') {
      this.seven = true;
      this.cuota = '$140.380';
      this.email = 'mailto:superhipoteca@santander.cl';
      this.redired =
        'https://www.bancoestado.cl/imagenes/nuevo_form/11394_simulador_consumo/solicitud.asp';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-estado.png';
      this.about =
        'En el año 1953 a partir de la fusión de la Caja de Crédito Hipotecario. la Caja Nacional de Ahorros. la Caja de Crédito Agrario y el Instituto de Crédito Industrial. se crea el Banco del Estado de Chile. como una empresa autónoma del Estado. con personalidad jurídica y patrimonio propio. Hoy en día Banco Estado sotienen una sólida posición en el mercado financiero. siendo uno de los bancos más grandes del país. A través de la Banca Personas. más de 11 millones de habitantes han depositado su confianza en BancoEstado para la gestión de sus finanzas. con un servicio eficiente. rentable. y de calidad. que se enfoca de manera especial en ayudar a romper las barreras de acceso al sistema bancario. Para ello. BancoEstado pone a disposición de sus clientes una amplia gama de productos y servicios. tanto financieros como no financieros. sin distinciones de ningún tipo.';
    } else if (current === 'cencosud') {
      this.eigth = true;
      this.cuota = '$170.709';
      this.email = 'mailto:contacto@scotiabank.cl';
      this.redired =
        'https://www.tarjetacencosud.cl/publico/pagos/landing/paga-tu-credito-de-consumo';
      this.logo =
        'https://s3.amazonaws.com/marketplace.comparaonline.com/marketplace/logos/divisions/scotiabank-cencosud.png';
      this.about =
        'Estableció su division de servicios financieros en 2003, cuando lanzamos nuestra tarjeta Jumbo Más, para facilitar la compra dentro de nuestras tiendas. Desde entonces, hemos aumentado significativamente nuestras operaciones de tarjetas de crédito. Hoy, la división de servicios financieros representa aproximadamente 1% y 6% de nuestros ingresos y EBITDA ajustado respectivamente. Nuestro principal objetivo es profundizar la relación con nuestros clientes, ofreciendo un servicio más completo y generando un mayor valor agregado desde las sinergias que existen entre los negocios y todas las subsidiarias de Cencosud.';
    } else if (current === 'falabella') {
      this.nine = true;
      this.cuota = '$146.391';
      this.email = 'mailto:ejecutivasbtoutbound@bancofalabella.cl';
      this.redired = 'https://www.bancofalabella.cl/credito-de-consumo';
      this.logo =
        'https://d7nxjt1whovz0.cloudfront.net/marketplace/logos/divisions/banco-falabella.png';
      this.about =
        'Banco Falabella es un banco chileno.que a la vez es dueño de la cadena de tiendas departamentales Falabella. y que le da el nombre a la institución financiera. Actualmente Banco Falabella también se encuentra en Colombia y Perú. Actualmente Banco Falabella está presente en las principales ciudades de Chile. especialmente en aquellas donde existen sucursales de la tienda departamental del mismo nombre. Sus oficinas centrales se ubican en Santiago Centro.';
    }

    this.scroll.scrollToPosition([0, 0]);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  goCampain() {
    this.scrollToElement(this.aboutCompany.nativeElement);
  }

  private scrollToElement(element: HTMLElement) {
    this.scrollService.scrollToElement(element);
  }
}
